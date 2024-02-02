/*
This PCI used Wiquid's PCI Generator for TAO platform
@author: Jean-Philippe Rivière - Wiquid - https://www.wiquid.fr
This PCI can be adapted to your needs.
Contact me : jean-philippe.riviere@geogebra.org
A GeoGebra production - Dynamic Mathematics for Everyone, http://www.geogebra.org
@license: This file is subject to the GeoGebra Non-Commercial License Agreement, see http://www.geogebra.org/license. For questions please write us at office@geogebra.org.
*/

/**
 * The NoRp state stands for "no response processing" state.
 * It is a sub-state of the state answer.
 * It defines the state of an interaction when it is in the response editing mode with response processing disabled
 */
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Answer',
    'taoQtiItem/qtiCreator/widgets/interactions/helpers/answerState'
], function (stateFactory, Answer, answerStateHelper) {
    'use strict';
    return stateFactory.create('norp', ['answer', 'active'], function () {
        console.log("LOAD NORP!!!!!!!!!")
        var widget = this.widget;
        var interaction = widget.element;
        console.log(interaction)

        var responseDeclaration = interaction.getResponseDeclaration();
        console.log(responseDeclaration.template) ;
        responseDeclaration.attributes.baseType = "string";

        interaction.triggerPci('RProcessingChange', ["answer"]); // Send it to AMD for action
        

    }, function () {
       /*  throw new Error('state "norp" prototype exit method must be implemented'); */
    });
});