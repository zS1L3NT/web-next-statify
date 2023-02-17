import { useDispatch } from "react-redux"

import { AppDispatch } from "../store"

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export default useAppDispatch
