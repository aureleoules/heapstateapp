import DeployStatus from "./deploy_status";

type Build = {
    id: string
    app_id: string

    branch: string
    commit_hash: string
    commit_message: string
    logs: Array<string>

    status: DeployStatus
    error: string

    created_at: Date
}

export default Build;