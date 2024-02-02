define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Answer',
    'taoQtiItem/qtiCreator/widgets/interactions/helpers/answerState',
    'taoQtiItem/qtiCreator/widgets/helpers/content'
], function(stateFactory, Answer, answerStateHelper) {
    'use strict';

    var InteractionStateAnswer = stateFactory.extend(Answer, function initAnswerState() {      
        
        answerStateHelper.forward(this.widget, {
            rpTemplates: ['CUSTOM','NONE', 'MATCH_CORRECT'],
        });
        var interaction = this.widget.element;

        this.widget.$original.find('.Konvert input').prop('disabled', true);
    
    
    
    }, function exitAnswerState() {
        this.widget.$original.find('.Konvert input').prop('disabled', false);
    });

    InteractionStateAnswer.prototype.initResponseForm = function initResponseForm() {

        var interaction = this.widget.element;
        interaction.resetResponse();

        answerStateHelper.initResponseForm(
            this.widget, {
                rpTemplates: ['CUSTOM','NONE', 'MATCH_CORRECT'],
            }
        );
    };

    return InteractionStateAnswer;
});