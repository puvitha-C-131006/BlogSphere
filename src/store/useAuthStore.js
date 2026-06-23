import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  initializeAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore if needed
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        set({ 
          user: { 
            uid: user.uid, 
            email: user.email, 
            name: user.displayName || userData.name || 'User',
            avatar: user.photoURL || userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
          }, 
          isLoading: false 
        });
      } else {
        set({ user: null, isLoading: false });
      }
    });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting the user state
      return true;
    } catch (error) {
      set({ 
        error: error.message.replace('Firebase: ', ''), 
        isLoading: false 
      });
      return false;
    }
  },

  register: async (name, email, password, username, phone, role) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with name
      await updateProfile(user, {
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      });

      // Save additional user info to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        username,
        phone,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        createdAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      set({ 
        error: error.message.replace('Firebase: ', ''), 
        isLoading: false 
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateUserProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = auth.currentUser;
      if (user) {
        if (data.name) {
          await updateProfile(user, { displayName: data.name });
        }
        // Update Firestore
        await setDoc(doc(db, 'users', user.uid), data, { merge: true });
        
        // Update local state
        set((state) => ({
          user: { ...state.user, ...data },
          isLoading: false
        }));
        return true;
      }
      return false;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
}));

export default useAuthStore;
