import { Chat } from "@/icons/chat"
import { Heart } from "@/icons/heart"
import { MegaPhone } from "@/icons/mega-phone"

export type CreateGroupPlaceholderProps = {
    id: string
    label: string
    icon: JSX.Element
}

export const CREATE_GROUP_PLACEHOLDER: CreateGroupPlaceholderProps[] = [
    {
        id: "0",
        label: "Highly engaging",
        icon: <MegaPhone />,
    },
    {
        id: "1",
        label: "Easy to setup",
        icon: <Heart />,
    },
    {
        id: "2",
        label: "Group chat and posts",
        icon: <Chat />,
    },
]
