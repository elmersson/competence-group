import { type AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import { LANDING_PAGE_MENU, type MenuProps } from "./menus"

type ComptenceGroupConstantsProps = {
    landingPageMenu: MenuProps[]
    signUpForm: AuthFormProps[]
    signInForm: AuthFormProps[]
}

export const COMPETENCE_GROUP_CONSTANTS: ComptenceGroupConstantsProps = {
    landingPageMenu: LANDING_PAGE_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
}
