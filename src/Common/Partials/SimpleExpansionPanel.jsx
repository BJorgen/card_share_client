import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function SimpleExpansionPanel(props) {

  return (
    <div>
      <ExpansionPanel>

        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          {props.header}

        </ExpansionPanelSummary>


        <ExpansionPanelDetails>
          {props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}