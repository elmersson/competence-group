import { type AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import { LANDING_PAGE_MENU, type MenuProps } from "./menus"
import {
    CREATE_GROUP_PLACEHOLDER,
    type CreateGroupPlaceholderProps,
} from "./placeholder"

type ComptenceGroupConstantsProps = {
    landingPageMenu: MenuProps[]
    signUpForm: AuthFormProps[]
    signInForm: AuthFormProps[]
    createGroupPlaceholder: CreateGroupPlaceholderProps[]
}

export const COMPETENCE_GROUP_CONSTANTS: ComptenceGroupConstantsProps = {
    landingPageMenu: LANDING_PAGE_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
    createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
}
