import {getProviders, signIn} from "next-auth/react";

const Login = ({providers}) => {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt=""/>

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="bg-[#18d860] text-white p-5 rounded-full"
                        onClick={() => signIn(provider.id, {
                            callbackUrl: "/" // After success on SignIn, redirect to '/' (Home)
                        })}
                    >
                        Log In with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login


export const getServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}