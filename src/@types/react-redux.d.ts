import { AppState } from "../store"
import "react-redux"

declare module "react-redux" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultRootState extends AppState {}
}
