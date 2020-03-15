import Provider from "./provider";
import BuildOptions from './build_options';
import Build from "./build";
import ContainerOptions from "./container_options";

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

    last_build?: Build

    created_at?: Date
    updated_at?: Date
}

export default App;