import React, {Component, createContext} from "react";

type TokenContextType = {
    token: string,
    setToken: (token: string) => void,
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

type TokenContextProviderProps = {
    children: React.ReactNode,
};

type TokenContextProviderState = {
    token: string,
};

class TokenContextProvider extends Component<TokenContextProviderProps, TokenContextProviderState> {
    constructor(props: TokenContextProviderProps) {
        super(props);

        this.state = {
            token: "",
        };
    }

    setToken = (token: string) => {
        this.setState({
            token,
        });
    };

    render() {
        const {children} = this.props;
        const { token } = this.state;

        return (
            <TokenContext.Provider value={{ token, setToken: this.setToken }}>
                {children}
            </TokenContext.Provider>
        );
    }
}