import {Accordion, AccordionHeader, AccordionBody} from "@material-tailwind/react";
import {alpha, Stack, styled, Switch, Typography} from "@mui/material";
import PropTypes from "prop-types";

/**
 * The Accordion class that displays the accordion
 * @param props             the input props
 * @returns {JSX.Element}   the accordion content
 * @constructor             passes in props to the class
 */
function AccordionContent(props) {
    // Prop Validation
    AccordionContent.propTypes = {
        name: PropTypes.string.isRequired,
        ppName: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        toggle: PropTypes.bool.isRequired,
        isOpen: PropTypes.bool.isRequired,
        accordionHeader: PropTypes.string.isRequired,
        ppContent: PropTypes.array.isRequired,
        handleSetPPContent: PropTypes.func.isRequired,
    };

    // Styling
    const AccentSwitch = styled(Switch)(({ theme }) => {
        return ({
            '& .MuiSwitch-switchBase.Mui-checked': {
                color: "#17877D",
                '&:hover': {
                    backgroundColor: alpha("#17877D", theme.palette.action.hoverOpacity),
                },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: "#17877D",
            },
        });
    });

    // Functions
    /**
     * Display content according to toggle value, type, name and ppName.
     * It will call the query according to the above values and display the associated data
     * @returns {JSX.Element|null}
     */
    const queryContent = () => {
        {/*TODO: call query according to toggle, type, name, ppName */}
        let type = props.type
        let name = props.name
        let ppName = props.ppName
        let toggle = props.toggle
        switch(type) {
            case "Threats": {
                if (toggle) {
                    return (<div>Threat XML Content</div>)
                } else {
                    return (<div>Threat String Content</div>)
                }
            }
            case "SecurityObjectives": {
                if (toggle) {
                    return (<div>Objective XML Content</div>)
                } else {
                    return (<div>Objective String Content</div>)
                }
            }
            case "SFRs": {
                if (toggle) {
                    return (<div>SFR XML Content</div>)
                } else {
                    return (<div>SFR String Content</div>)
                }
            }
            default:
                return null;
        }
    }

    // Handle Functions
    /**
     * Handles the updates to the accordion and sets the related data in the parent
     */
    const handleUpdates = (type) => {
        try {
            // Get selection value
            let name = props.name
            let ppName = props.ppName
            let isOpen = props.isOpen
            let pps = props.ppContent.valueOf()
            let toggle = props.toggle
            let ppIndex = pps.findIndex(x => x.name === ppName);
            if (ppIndex !== -1) {
                let values = pps[ppIndex].values.valueOf()
                let valueIndex = values.findIndex(x => x.name === name);
                if (valueIndex !== -1) {
                    if (type === "accordion") {
                        pps[ppIndex].values[valueIndex].isOpen = !isOpen
                    } else {
                        pps[ppIndex].values[valueIndex].toggle = !toggle
                    }
                }
            }

            // Update ppContent
            props.handleSetPPContent(pps.valueOf())
        } catch (e) {
            console.log(e)
        }
    }

    // Return Function
    return (
        <div>
            <Accordion
                id={props.name}
                className={"bg-gray-300 rounded-md border-2 border-gray-400"}
                open={props.isOpen}
                icon={
                    <div>
                        {
                            !props.isOpen ?
                                // Show down arrow icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                </svg>
                                :
                                // Show up arrow icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                                </svg>
                        }
                    </div>
                }
            >
                <AccordionHeader
                    className={(props.isOpen ? " border-b-2 bg-gray-100" : " border-b-0") + " px-6 text-lg font-extrabold text-accent border-gray-400"}
                    onClick={() => handleUpdates("accordion")}
                >
                    {props.accordionHeader}
                </AccordionHeader>
                <AccordionBody className={"px-4 bg-gray-200"}>
                    <div className="grid grid-rows-4 grid-flow-col gap-2">
                        <div className="row-span-1">
                            <Stack direction="row" component="label" alignItems="center" justifyContent="center">
                                <Typography>String</Typography>
                                <AccentSwitch checked={props.toggle} inputProps={{'aria-label': 'controlled'}} size="medium"
                                              onChange={() => handleUpdates("toggle")}/>
                                <Typography>XML</Typography>
                            </Stack>
                        </div>
                        <div className="row-span-1 flex justify-center items-center text-lg">
                            {queryContent()}
                        </div>
                    </div>
                </AccordionBody>
            </Accordion>
        </div>
    );
}

// Export Class
export default AccordionContent;