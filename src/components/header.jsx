function HeaderNav() {
    const routes = {"Register": "register", "Login": "login"};
    const currentLocation = window.location.href.split("/").pop();
    return (
        <ul id="headerNav">
            {
                Object.entries(routes).map(([name, route]) => {
                    return currentLocation !== route ? <a href={"/" + route}>{name}</a>: null;
                })
            }
        </ul>
    );
} 

function Header() {
    return <header>
            <h2>CeloHousing</h2>
            {HeaderNav()}
        </header>
};

export default Header;