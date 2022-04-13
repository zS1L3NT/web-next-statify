import { TypedUseSelectorHook, useSelector } from "react-redux"

import { RootState } from "../store"

export default useSelector as TypedUseSelectorHook<RootState>
