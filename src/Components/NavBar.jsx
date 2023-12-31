// Imports
import PropTypes from "prop-types";
import Tabs from "../Components/Tabs.jsx";

/**
 * The NavBar class that displays the navigation bar and search capability
 * @param props             the input props
 * @returns {JSX.Element}   the navigation bar content
 * @constructor             passes in props to the class
 */
function NavBar(props) {
    // Prop Validation
    NavBar.propTypes = {
        activeTab: PropTypes.string.isRequired,
        handleTabClick: PropTypes.func.isRequired,
    };

    // Return Function
    return (
        <nav className="navbar flex text-neutral-content min-w-full bg-base-300 border-2 border-t-3 border-l-3 rounded-lg border-gray-500 mt-1">
            <div className="navbar-start font-title flex font-bold text-[44px] text-teal-400 pl-5">SFR Catalog</div>
            <div className="navbar-end">
                <Tabs activeTab={props.activeTab} handleTabClick={props.handleTabClick.bind(this)}/>
            </div>
        </nav>
    )
}

// Export Class
export default NavBar;