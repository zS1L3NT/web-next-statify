import { AppDispatch } from "../store"
import { useDispatch } from "react-redux"

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export default useAppDispatch
