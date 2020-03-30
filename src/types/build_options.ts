import EnvVar from './env_var';

type BuildOptions = {
    branch: string
    env?: Array<EnvVar>
}

export default BuildOptions;