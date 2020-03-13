import Provider from "./provider";

type Deployment = {
    token: string
    provider: Provider
    branch: string
    owner: string
    name: string
}

export default Deployment;