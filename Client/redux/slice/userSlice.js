import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    profilePic: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    fitnessGoals: "",
    stepsToday: "",
    workouts: "",
    token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.profilePic = action.payload.profilePic;
            state.age = action.payload.age;
            state.gender = action.payload.gender;
            state.height = action.payload.height;
            state.weight = action.payload.weight;
            state.activityLevel = action.payload.activityLevel;
            state.fitnessGoals = action.payload.fitnessGoals;
            state.stepsToday = action.payload.stepsToday;
            state.workouts = action.payload.workouts;
        }
    },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer;