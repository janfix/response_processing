/*
This PCI used Wiquid's PCI Generator for TAO platform
@author: Jean-Philippe Rivière - Wiquid - https://www.wiquid.fr
This PCI can be adapted to your needs.
Contact me : jean-philippe.riviere@geogebra.org
A GeoGebra production - Dynamic Mathematics for Everyone, http://www.geogebra.org
@license: This file is subject to the GeoGebra Non-Commercial License Agreement, see http://www.geogebra.org/license. For questions please write us at office@geogebra.org.
*/

define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/states/Correct',
    'taoQtiItem/qtiCreator/widgets/interactions/helpers/answerState',
    'lodash'
], function(stateFactory, Correct, answerStateHelper, _) {

    var GGBPCIStateCorrect = stateFactory.create(Correct, function() {
        var widget = this.widget;
        var interaction = widget.element;

        //This is the responseDeclaration in XML
        var responseDeclaration = interaction.getResponseDeclaration();
        responseDeclaration.template = "http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct";
        responseDeclaration.attributes.baseType = "integer"
        responseDeclaration.setCorrect([1]);

        //THIS CUSTOM CODE GENERATE ERROR MANAGING THE XML MODIFICATION. BETTER KEEP THE DEFAULT !

        answerStateHelper.initResponseForm(
            this.widget, {
                rpTemplates: ['CUSTOM','MATCH_CORRECT', 'NONE'],
            }
        );


        interaction.triggerPci('RProcessingChange', ["MCorrect"]); // Send it to AMD for action


        var responseDeclaration = interaction.getResponseDeclaration();


    }, function() {
        var widget = this.widget;
        var interaction = widget.element;

        interaction.resetResponse();
        interaction.offPci('.question');
    });

    return GGBPCIStateCorrect;
});