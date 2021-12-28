import { RootState } from "../store"
import { TypedUseSelectorHook, useSelector } from "react-redux"

export default useSelector as TypedUseSelectorHook<RootState>
