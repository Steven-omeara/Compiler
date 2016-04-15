function SA(AST,CST)
{

    function createSymTable()
    {
    	var scope = -1;
    	var symTable = new SymbolTable();

    	 function expand(node,scope)
        {

        	function block(node,scope)
        	{
        		scope++;
        		symTable.addNode("Scope " + scope,"branch");
        		//console.log("table");
        		for (var i = 0; i < node.children.length; i++)
            	{
                	checkStmtList(node.children[i],scope);
            	}
        	}

        	function checkStmtList(node,scope)
        	{
        		if(node.name == "varDecl")
        		{
        			symTable.cur.hashTable.addKeyValPair(node.children[1].name,node.children[0].name,scope,node.lineNum);
        		}
        		if(node.name == "Block")
        		{
        			block(node,scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "If")
        		{
        			block(node.children[1],scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "While")
        		{
        			block(node.children[1],scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "Assign")
        		{
        			var nodeType;
        			if(node.children[1].name == "+")
        			{
                        //check the variable
                        nodeType = "Int";
                        nodeType = symTable.cur.hashTable.findIdType(symTable.cur,node.children[0].name,nodeType,node.children[0].lineNum);

                        //function to check each node(place ifIBreak here if break)
                        function checkIntExpr(currNode)
                        {
                            if (currNode.children[1].name == "+")
                            {
                                checkIntExpr(currNode.children[1]);
                            }
                            else if (currNode.children[1].name != "+")
                            {
                                if(currNode.children[1].name == "True" || currNode.children[1].name == "False")
                                {
                                    putMessage('Error in SA on line,' + currNode.lineNum + ' intExpr expected int got boolean');
                                    errorCount = errorCount + 1;
                                }
                                else if(Number.isInteger(parseInt(currNode.children[1].name.valueOf())) == true)
                                {
                                    if(document.getElementById("verboseoutput").checked == true && errorCount < 1)
                                    {
                                        putMessage('Succesfully matched with int on line,' + currNode.lineNum);
                                    }
                                }
                                else if(currNode.children[1].name.charAt(0) == '"')
                                {
                                    putMessage('Error in SA on line,' + currNode.lineNum + ' intExpr expected int got string');
                                    errorCount = errorCount + 1;
                                }
                                else if(currNode.children[1].name == "!=" || currNode.children[1].name == "==")
                                {
                                    putMessage('Error in SA on line,' + currNode.lineNum + ' intExpr expected int but got boolval');
                                    errorCount = errorCount + 1;
                                }
                                else
                                {
                                    var nodeType = symTable.cur.hashTable.findIdType(symTable.cur,currNode.children[1].name,currNode.lineNum);
                                    if (nodeType != "Int" && nodeType != false)
                                    {
                                        putMessage("Error on line," + currNode.lineNum + " expecting a int, got a " + nodeType);
                                        errorCount = errorCount + 1;
                                    }
                                }
                            }
                        }  

                        if (nodeType == "Int")
                        {
                            checkIntExpr(node);
                        }
                        else
                        {
                            putMessage("Error: the current ID " + node.children[0].name + " on line " + node.children[0].lineNum + " is not of type int");
                            errorCount = errorCount + 1;
                        }
                        
        			}
        			else if(node.children[1].name == "!=" || node.children[1].name == "==")
        			{
                        //Check if the identifier is a boolean first, do later

                        //Overaching BoolVal check
                        function checkBoolVal(currNode)
                        {
                            var checkExp1;
                            var checkExp2;
                            checkExp1 = checkExpr(currNode.children[0]);
                            checkExp2 = checkExpr(currNode.children[1]);
                            //console.log(checkExp1);
                            //console.log(checkExp2);
                            if (checkExp1 == checkExp2)
                            {
                                //console.log("True");
                                if(document.getElementById("verboseoutput").checked == true && errorCount < 1)
                                    {
                                        putMessage("Successfully compared bools on line " + currNode.lineNum + " got two of same type in a bool statement, " + checkExp1 + " and " + checkExp2);
                                    }
                                return checkExp1;
                            }
                            else if (checkExp1 != checkExp2)
                            {
                                //console.log("False");
                                putMessage("Error in SA on line " + currNode.lineNum + " got two diffrent types in a bool statement, " + checkExp1 + " and " + checkExp2);
                                errorCount = errorCount + 1;
                                return checkExp1;
                            }
                        }

                        function boolValIntExpCheck(leCheck)
                        {
                            var intExprType;

                            function runChecker(nodeCheck)
                            {
                                if (nodeCheck.children[1].name == "+")
                                {
                                    runChecker(nodeCheck.children[1]);                                   
                                }
                                else if (nodeCheck.children[1].name != "+")
                                {
                                    if(nodeCheck.children[1].name == "True" || nodeCheck.children[1].name == "False")
                                    {
                                        putMessage('Error in SA, intExpr expected int got boolean on line ' + nodeCheck.lineNum);
                                        errorCount = errorCount + 1;
                                    }
                                    else if(Number.isInteger(parseInt(nodeCheck.children[1].name.valueOf())) == true)
                                    {
                                        if(document.getElementById("verboseoutput").checked == true && errorCount < 1)
                                        {
                                            putMessage('Succesfully matched with int on line' + nodeCheck.lineNum);
                                        }
                                        intExprType = "Int";
                                    }
                                    else if(nodeCheck.children[1].name.charAt(0) == '"')
                                    {
                                        putMessage('Error in SA, intExpr expected int got string on line ' + nodeCheck.lineNum);
                                        errorCount = errorCount + 1;
                                    }
                                    else if(nodeCheck.children[1].name == "!=" || nodeCheck.children[1].name == "==")
                                    {
                                        putMessage('Error in SA, intExpr expected int but got boolval on line ' + nodeCheck.lineNum);
                                        errorCount = errorCount + 1;
                                    }
                                    else
                                    {
                                        var nodeType = symTable.cur.hashTable.findIdType(symTable.cur,nodeCheck.children[1].name,node.lineNum);
                                        if (nodeType != "Int" && nodeType != false)
                                        {
                                            putMessage("Error, expecting a int, got a " + nodeType + " on line " + nodeCheck.lineNum);
                                            errorCount = errorCount + 1;
                                        }
                                        else if (nodeType == "Int")
                                        {
                                            if(document.getElementById("verboseoutput").checked == true && errorCount < 1)
                                            {
                                                putMessage('Succesfully matched with int on line' + nodeCheck.lineNum);
                                            }
                                            intExprType = "Int";  
                                        }
                                    } 
                                }
                                return intExprType;
                            }
                            
                            intExprType = runChecker(leCheck);
                            return intExprType;
                        }

                        //checking each expr in boolval
                        function checkExpr(leNode)
                        {
                            var currExprType;
                            if (leNode.name == "True" || leNode.name == "False")
                            {
                                currExprType = "Boolean";
                            }
                            else if(Number.isInteger(parseInt(leNode.name.valueOf())) == true)
                            {
                                currExprType = "Int";
                            }
                            else if(leNode.name.charAt(0) == '"')
                            {
                                currExprType = "String";
                            }
                            else if(leNode.name == "!=" || leNode.name == "==")
                            {
                                currExprType = checkBoolVal(leNode);
                            }
                            else if(leNode.name == "+")
                            {
                                currExprType = boolValIntExpCheck(leNode);
                            }
                            else
                            {                               
                                var currExprType = symTable.cur.hashTable.findIdType(symTable.cur,leNode.name,leNode.lineNum);
                                if (currExprType == false)
                                {
                                    errorCount = errorCount + 1;
                                }
                            }    
                            return currExprType;
                        }
                        //inital call
                        checkBoolVal(node.children[1]);
        			}
        			else
        			{
        				if(node.children[1].name == "True" || node.children[1].name == "False")
        				{
        					nodeType = "Boolean";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				else if(Number.isInteger(parseInt(node.children[1].name.valueOf())) == true)
        				{
        					//console.log(symTable.cur.name);
        					nodeType = "Int";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				else if(node.children[1].name.charAt(0) == '"')
        				{
        					nodeType = "String";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				else
        				{
        					var nodeType = symTable.cur.hashTable.findIdType(symTable.cur,node.children[1].name,node.lineNum);
                            //console.log(nodeType);
        					if (nodeType != false)
        					{
        						symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        					}
        				}
        				
        			}
        		}
        	}

        	if(node.name == "Block")
        	{
        		block(node,scope);
        	}
        }

       	expand(AST.root,scope);

       	return symTable;
   	}

	putSA(createSymTable());	
}