import Navigator from "./Navigator"

export default function Layout({children}) {
    return (
        <>
           <Navigator/>
            {children}
            {/*<h4>Footer</h4>*/}
        </>
    )
}