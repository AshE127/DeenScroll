import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { auth, db, googleProvider } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

// ============================================
// FREE TIER DAILY LIMITS
// ============================================
const DAILY_LIMITS = {
  trivia: 10,
  "surah-match": 3,
  emoji: 8,
  hadith: 10,
};

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getPlayCounts() {
  try {
    const data = JSON.parse(localStorage.getItem("deenscroll-plays") || "{}");
    if (data.date !== getTodayKey()) return { date: getTodayKey() };
    return data;
  } catch { return { date: getTodayKey() }; }
}

function savePlayCounts(data) {
  try { localStorage.setItem("deenscroll-plays", JSON.stringify(data)); } catch {}
}

// ============================================
// PROVIDER
// ============================================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [limitGame, setLimitGame] = useState(null);

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setIsPremium(userDoc.data().premium === true);
          } else {
            await setDoc(doc(db, "users", firebaseUser.uid), {
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              photo: firebaseUser.photoURL,
              premium: false,
              createdAt: new Date().toISOString(),
            });
            setIsPremium(false);
          }
        } catch (err) {
          console.error("Firestore error:", err);
          setIsPremium(false);
        }
      } else {
        setIsPremium(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      console.error("Sign in error:", err);
      return null;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsPremium(false);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }, []);

  // Check if user can play (returns true if allowed)
  const checkPlayLimit = useCallback((gameId) => {
    if (isPremium) return true;
    const limit = DAILY_LIMITS[gameId];
    if (!limit) return true; // no limit for this game (facts, stories, mood, bingo)

    const counts = getPlayCounts();
    const played = counts[gameId] || 0;
    if (played >= limit) {
      setLimitGame(gameId);
      setShowPremiumModal(true);
      return false;
    }
    return true;
  }, [isPremium]);

  // Record a play
  const recordPlay = useCallback((gameId) => {
    if (isPremium) return;
    if (!DAILY_LIMITS[gameId]) return;
    const counts = getPlayCounts();
    counts[gameId] = (counts[gameId] || 0) + 1;
    savePlayCounts(counts);
  }, [isPremium]);

  // Get remaining plays
  const getRemainingPlays = useCallback((gameId) => {
    if (isPremium) return Infinity;
    const limit = DAILY_LIMITS[gameId];
    if (!limit) return Infinity;
    const counts = getPlayCounts();
    const played = counts[gameId] || 0;
    return Math.max(0, limit - played);
  }, [isPremium]);

  const closePremiumModal = useCallback(() => {
    setShowPremiumModal(false);
    setLimitGame(null);
  }, []);

  const value = {
    user,
    isPremium,
    loading,
    signInWithGoogle,
    signOutUser,
    checkPlayLimit,
    recordPlay,
    getRemainingPlays,
    showPremiumModal,
    closePremiumModal,
    limitGame,
    DAILY_LIMITS,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
