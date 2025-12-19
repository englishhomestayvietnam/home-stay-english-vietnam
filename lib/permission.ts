import { createAccessControl } from "better-auth/plugins/access";

const statement = {
    review: ["write"],
    dashboard: ["view", "update", "delete", "approve", "reject"]
} as const;

export const ac = createAccessControl(statement)

export const user = ac.newRole({
    review: ["write"],
    dashboard: []
})

export const superUser = ac.newRole({
    review: ["write"],
    dashboard: ["view", "update"]
})

export const admin = ac.newRole({
    review: ["write"],
    dashboard: ["view"]
})

export const superAdmin = ac.newRole({
    review: ["write"],
    dashboard: ["view", "update", "delete", "approve", "reject"]
})