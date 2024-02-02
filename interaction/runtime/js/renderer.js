/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 */
define(['taoQtiItem/portableLib/jquery_2_1_1', 
        'KonvertPCI/interaction/runtime/js/assets',
        
        
    
    ], function($, assets) {
    'use strict';

    function renderChoices(id, $container, config) {

       


        console.log($container.parent())
        var MyArray = ["Solo"];
        addToXML();
        console.log(typeof MyArray.toXML);
        delToXML();



        function addToXML(){
            Array.prototype.toXML = function(serializer) {
            return this.reduce(function(xml, item) {
                return xml + serializer.store(item);
            }, '');
        };
        }    
       
        

        //Suppression directe
       function delToXML(){
         const myMethodDescriptor = Object.getOwnPropertyDescriptor(Array.prototype, 'toXML');
            if (myMethodDescriptor.configurable) {
            delete Array.prototype.toXML;
            }
       }
       


       
   
    
    }

    

    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config);
            
        },
        renderChoices: function(id, container, config) {
            renderChoices(id, $(container), config);
        }
    };
});