angular.module('myApp.directives', [])
    .directive('gameRunner', ['Cell','$window',
        function (Cell, $window) {
        "use strict";
        return {
            restrict : 'EAC',
            replace : true,
            scope :{
                setFn: '&'
            },
            template: "<div width='400px' height='400px'></div>",
            link: function (scope, element, attribute) {

                var cells;
                initGame();
                initTouch();
                initKey();
                function initGame() {

                    cells = new Array();

                    for (var i=0 ; i<4; i++) {
                        for (var j=0; j<4; j++) {
                            var cell = new Cell({x:i, y:j, value:0});
                            cell.addToElement(element);
                            cells.push(cell);

                        }

                    }
                    addRandomCell();
                    addRandomCell();


                }


                function initTouch() {
                    scope.goTo = function($event) {
                        console.log($event);
                        switch($event) {
                            case 1:
                                goTop();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 2:
                                goBottom();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 3:
                                goLeft();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 4:
                                goRight();
                                redrawCells();
                                addRandomCell();

                                break;
                            default:
                                break;

                        }
                    }
                    scope.setFn({fn: scope.goTo});
                }


                function initKey() {
                    angular.element($window).bind('keydown', function(e) {
                        switch (e.which) {
                            case 38:
                                goTop();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 37:
                                goLeft();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 39:
                                goRight();
                                redrawCells();
                                addRandomCell();
                                break;
                            case 40:
                                goBottom();
                                redrawCells();
                                addRandomCell();
                                break;
                        };



                    });
                }

                function addRandomCell() {


                    var freeCells = new Array();
                    for (var i=0;i<16;i++) {
                        freeCells.push(i);
                    }
                    var notfound = true;
                    var value = 2;
                    if (Math.random()>0.9) {
                        value =4;
                    }
                    while (notfound && freeCells.length > 0) {

                        var rand = Math.round(Math.random()*(freeCells.length-1));

                        var rand_index = freeCells[rand];
                        var cell = cells[rand_index];
                        if (cell.getValue()==0) {

                            cell.setValue(value);
                            notfound= false;
                        }
                        else {

                            freeCells.splice(rand, 1);
                        }

                    }
                    if (notfound) {

                        alert("game over!!!");
                    }
                    redrawCells();



                }

                function goTop() {

                    for (var i=0; i<4;i++) {

                        for (var j=3;j>0;j--) {
                            var cell  = cells[j*4+i];
                            var cell2 = cells[(j-1)*4+i];
                            updateCellValue(cell, cell2);

                        }

                    }

                }

                function goRight() {

                    for (var i=0; i<4;i++) {

                        for (var j=0;j<3;j++) {
                            var cell  = cells[i*4+j];
                            var cell2 = cells[i*4+j+1];
                            updateCellValue(cell, cell2);

                        }

                    }

                }

                function goLeft() {

                    for (var i=0; i<4;i++) {

                        for (var j=3;j>0;j--) {
                            var cell  = cells[i*4+j];
                            var cell2 = cells[i*4+j-1];
                            updateCellValue(cell, cell2);

                        }

                    }

                }

                function goBottom() {

                    for (var i=0; i<4;i++) {

                        for (var j=0;j<3;j++) {
                            var cell  = cells[j*4+i];
                            var cell2 = cells[(j+1)*4+i];
                            updateCellValue(cell, cell2);

                        }

                    }

                }

                function updateCellValue(cell,cell2) {
                    if (cell.getValue() == 0) {

                    }
                    else if (cell2.getValue() == 0){
                        cell2.setValue(cell.getValue());
                        cell.setValue(0);
                    }
                    else if (cell.getValue() == cell2.getValue()) {
                        cell.setValue(0);
                        cell2.setValue(cell2.getValue()*2);
                    }
                }

                function redrawCells() {
                    angular.forEach (cells, function(value, key) {
                        var cell = value;
                        cell.redraw();

                    });
                }








            }
        }
    }]);