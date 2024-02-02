define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/states/Custom',
    'tpl!taoQtiItem/qtiCreator/tpl/notifications/widgetOverlay',
    'taoQtiItem/qtiCreator/helper/xmlRenderer',
    'taoQtiItem/qtiCreator/widgets/interactions/helpers/answerState',
    'i18n',
    'lodash'
], function(stateFactory, Custom, overlayTpl, xmlRenderer, answerStateHelper,__, _){

    var InteractionStateCustom = stateFactory.create(Custom, function(){
        console.log("LOAD NEW -CUSTOM MODE - ---OoO---")
               
        //use default [data-edit="custom"].show();
        this.widget.$container.append(overlayTpl({
            message : __('Custom Response Processing Mode')
        }));
        var $e = this.widget.$container.find('[data-edit=map], [data-edit=correct]').hide();

        //BUILD INTERACTION and ITEM
        var widget = this.widget;
        var interaction = widget.element;
        var item = interaction.getRootElement()
        

        //Custom function add UNIQ Outcomes with their own parameters
        function  createOutcomeDeclarationIfNotExists(outcomeIdentifier, cardi, btype, buildIdentifier) {
            let outcome = item.getOutcomeDeclaration(outcomeIdentifier);

          if(!outcome){
              outcome = item.createOutcomeDeclaration({
                  cardinality : cardi,
                  baseType : btype
              });

              buildIdentifier
                ? outcome.buildIdentifier(outcomeIdentifier, false)
                : outcome.attr('identifier', outcomeIdentifier);
          }
        }

        //DEFINE SCORE AND MAXSCORE OUTCOMES WITH UNIQ MODE !!! 
        createOutcomeDeclarationIfNotExists("SCORE", "single", "float");
        createOutcomeDeclarationIfNotExists("MAXSCORE", "single" , "integer");
        createOutcomeDeclarationIfNotExists("INFO", "single", "string");
        createOutcomeDeclarationIfNotExists("SPY", "single", "string");

        //CREATE RESPONSE DECLARATION
        var responseDeclaration = interaction.getResponseDeclaration();
        responseDeclaration.attributes.cardinality = "record"; //single | multiple | record
        //responseDeclaration.attributes.baseType = "float";
        
        console.log(responseDeclaration.renderer);

       
        
        console.log(responseDeclaration)

 
        // TEMPLATE PROCESSING
        var rpTpl = `
        <responseProcessing>
            <responseCondition>
                <responseIf>
                    <not>
                    <isNull>
                        <variable identifier="RESPONSE"/>
                    </isNull>
                    </not>
                    <setOutcomeValue identifier="SCORE"> 
                        <fieldValue fieldIdentifier="Primus">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                    <setOutcomeValue identifier="MAXSCORE"> 
                        <fieldValue fieldIdentifier="MaxScore">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                    <setOutcomeValue identifier="INFO"> 
                        <fieldValue fieldIdentifier="info">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                </responseIf> 
                <responseElse>
                    <setOutcomeValue identifier="SCORE"> 
                         <baseValue baseType="float">25</baseValue>   
                    </setOutcomeValue>           
                </responseElse> 
            </responseCondition>       
        </responseProcessing>        
        `
        
       // My Example :  ADDITION BETWEEN ITEMS !!!
       /*`<responseProcessing>
            <setOutcomeValue identifier="SCORE">
                <sum>
                <variable identifier="RESPONSE_1"/>
                <variable identifier="RESPONSE"/>      
                </sum>
            </setOutcomeValue>   
            <setOutcomeValue identifier="MAXSCORE"> 
                <sum>
                    <variable identifier="MAXSCORE"/> 
                </sum>
            </setOutcomeValue>
            <setOutcomeValue identifier="INFO"> 
                <baseValue baseType="string">Banana</baseValue> 
            </setOutcomeValue>        
        </responseProcessing>
        `;  */


        /* EXAMPLE ON TEST EMPTY RESPONSE OR NOT ? 
        <responseProcessing>
            <responseCondition>
                <responseIf>
                    <not>
                    <isNull>
                        <variable identifier="RESPONSE"/>
                    </isNull>
                    </not>
                    <setOutcomeValue identifier="SCORE"> 
                        <fieldValue fieldIdentifier="correct">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                    <setOutcomeValue identifier="MAXSCORE"> 
                        <fieldValue fieldIdentifier="MaxScore">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                    <setOutcomeValue identifier="INFO"> 
                        <fieldValue fieldIdentifier="info">
                            <variable identifier="RESPONSE"/>
                        </fieldValue> 
                    </setOutcomeValue>
                </responseIf> 
                <responseElse>
                    <setOutcomeValue identifier="SCORE"> 
                         <baseValue baseType="float">25</baseValue>   
                    </setOutcomeValue>
                    
                </responseElse> 
            </responseCondition>       
        </responseProcessing>
        */

        /*  <responseProcessing>

            <setOutcomeValue identifier="SPY">
                <truncate>
                    <variable identifier="RESPONSE"/>
                </truncate>
            </setOutcomeValue>


            <responseCondition>
                <responseIf>
                    <not>
                    <isNull>
                        <variable identifier="RESPONSE"/>
                    </isNull>
                    </not>
                    <setOutcomeValue identifier="INFO"> 
                        <variable identifier="SPY"/>   
                    </setOutcomeValue>
                                        
                </responseIf> 
                <responseElse>
                    <setOutcomeValue identifier="INFO"> 
                         <baseValue baseType="string">BADDDDD</baseValue>   
                    </setOutcomeValue>                    
                </responseElse> 
            </responseCondition>       
        </responseProcessing> */
        
        //Create the XML template for responseProcessing
        console.log(interaction.rootElement.rootElement.responseProcessing)
        interaction.rootElement.rootElement.responseProcessing.xml = rpTpl;
        
        

        //THIS CUSTOM CODE GENERATE ERROR MANAGING THE XML MODIFICATION. BETTER KEEP THE DEFAULT !
        answerStateHelper.initResponseForm(
            this.widget, {
                  rpTemplates: ['CUSTOM', 'MATCH_CORRECT', 'NONE'],
            }
        );

        // Send it to AMD for action
        interaction.triggerPci('RProcessingChange', ["Custom"]); 


    }, function(){
        console.log("After saving item")
        //use default [data-edit="custom"].hide();
        this.widget.$container.children('.overlay').remove();
        var widget = this.widget;
        var interaction = widget.element;
        console.log(interaction)
        interaction.resetResponse();
        interaction.offPci('.question');
        
    });

   

    return InteractionStateCustom;
});
