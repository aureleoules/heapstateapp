import Provider from "./provider";
import BuildOptions from './build_options';
import Build from "./build";
import ContainerOptions from "./container_options";
import AppState from "./app_state";

type App = {
    id?: string
    token?: string
    provider?: Provider
    build_options?: BuildOptions
    container_options?: ContainerOptions
    owner?: string
    name?: string

    complete_url?: string
    url?: string

    state?: AppState
    last_build?: Build

    created_at?: Date
    updated_at?: Date
}

export default App;