angular.module('myApp.directives', [])
    .directive('gameRunner', ['Cell','$window','ngDialog',
        function (Cell, $window, ngDialog) {
        "use strict";
        return {
            restrict : 'EAC',
            replace : true,
            scope :{
                setFn: '&'
            },
            template: "<div></div>",
            link: function (scope, element, attribute) {

                var cells;
                var addOne = false;
                var loose = false;
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

                        goTo($event);
                    }
                    scope.setFn({fn: scope.goTo});
                }


                function initKey() {
                    angular.element($window).bind('keydown', function(e) {
                        switch (e.which) {
                            case 38:
                                goTo(1);
                                break;
                            case 37:
                                goTo(3);
                                break;
                            case 39:
                                goTo(4);
                                break;
                            case 40:
                                goTo(2);
                                break;
                        };



                    });
                }

                function goTo(to) {



                    addOne = false;
                    if (to == 1) {
                        goTop();
                    }
                    else if (to==3) {
                        goLeft();
                    }
                    else if (to == 2) {
                        goBottom();
                    }
                    else {
                        goRight();
                    }


                    redrawCells();
                    if (addOne) {
                        addRandomCell();
                    }
                    else {
                        checkLoose();
                    }


                }

                function checkLoose() {

                    var notfound = true;
                    for (var j=0;j<4;j++) {
                        for (var i=0; i<4;i++) {

                            var cell  = cells[j*4+i];
                            if (cell.getValue() == 0) {
                                notfound = false;
                                break;
                            }
                        }

                    }

                    if (notfound && !loose) {
                        loose = true;
                        ngDialog.open({
                            template: '<h4>You loose !</h4><button class="btn btn-default" ng-click="closeThisDialog(\'retry\')">Retry</button>',
                            plain: true,
                            showClose:false,
                            preCloseCallback: function(value) {
                                retry();
                                return true;

                            }
                        });
                    }
                }

                function retry() {

                    loose = false;
                    for (var i=0 ; i<4; i++) {
                        for (var j=0; j<4; j++) {

                            var cell  = cells[i*4+j];
                            cell.setValue(0);

                        }

                    }
                    addRandomCell();
                    addRandomCell();



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
                            cell.setNew(true);
                            cell.setValue(value);
                            notfound= false;
                        }
                        else {

                            freeCells.splice(rand, 1);
                        }

                    }

                    redrawCells();



                }

                function goTop() {

                    for (var i=0; i<4;i++) {


                        for (var w=0;w<3;w++) {
                            for (var j=1;j<4;j++) {
                                var cell  = cells[j*4+i];
                                var cell2 = cells[(j-1)*4+i];



                                updateCellValue(cell, cell2);

                            }
                        }



                    }

                }

                function goRight() {

                    for (var i=0; i<4;i++) {

                        for (var w=0;w<3;w++) {

                            for (var j = 2; j >=0; j--) {
                                var cell = cells[i * 4 + j];
                                var cell2 = cells[i * 4 + j + 1];



                                updateCellValue(cell, cell2);

                            }
                        }

                    }

                }

                function goLeft() {

                    for (var i=0; i<4;i++) {


                        for (var w=0;w<3;w++) {

                            for (var j = 1; j < 4; j++) {
                                var cell = cells[i * 4 + j];
                                var cell2 = cells[i * 4 + j - 1];


                                updateCellValue(cell, cell2);

                            }
                        }

                    }

                }

                function goBottom() {

                    for (var i=0; i<4;i++) {


                        for (var w=0;w<3;w++) {

                            for (var j = 2; j >=0; j--) {
                                var cell = cells[j * 4 + i];
                                var cell2 = cells[(j + 1) * 4 + i];

                                updateCellValue(cell, cell2);

                            }
                        }

                    }

                }

                function updateCellValue(cell,cell2) {
                    if (cell.getValue() == 0) {

                    }
                    else if (cell2.getValue() == 0){

                        addOne = true;
                        cell2.setValue(cell.getValue());
                        cell.setValue(0);
                    }
                    else if (cell.getValue() == cell2.getValue() && !cell2.isJustAdded() && !cell.isJustAdded()) {


                        addOne = true;
                        cell.setValue(0);
                        cell2.setValue(cell2.getValue()*2);
                        cell2.setJustAdded(true);

                        if (cell2.getValue()>=2048) {
                            showWin();
                        }

                    }
                }

                function redrawCells() {
                    angular.forEach (cells, function(value, key) {
                        var cell = value;
                        cell.redraw();

                    });
                }

                function showWin() {

                    var body = angular.element(document).find('body');
                    body.addClass("win");
                }








            }
        }
    }]);