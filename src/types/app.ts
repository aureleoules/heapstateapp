import Provider from "./provider";
import BuildOptions from './build_options';

type App = {
    token: string
    provider: Provider
    build_options: BuildOptions
    owner: string
    name: string
    
    complete_url?: string
    url?: string
}

export default App;