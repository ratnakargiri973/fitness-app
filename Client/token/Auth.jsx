import { useEffect } from 'react';
import instance from '../AxiosConfig/AxiosConfig';
import { setUser } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const response = await instance.get('auth/valid-token', {
          withCredentials: true,
        });

        const userData = response.data.user;

        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          profilePic: userData.profilePic,
          age: userData.age,
          gender: userData.gender,
          height: userData.height,
          weight: userData.weight,
          activityLevel: userData.activityLevel,
          fitnessGoals: userData.fitnessGoals,
          stepsToday: userData.stepsToday,
          workouts: userData.workouts,
        }));
      } catch (error) {
        console.error('Auth failed:', error.response?.data || error.message);
      }
    };

    handleAuth();
  }, [dispatch]);
};

export default useAuth;
