type Props = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div>
            <span>AuthLayout</span>
            {children}
        </div>
    )
}

export default AuthLayout
