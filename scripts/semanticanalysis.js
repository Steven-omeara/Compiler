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
                        symTable.cur.hashTable.findIdType(symTable.cur,node.children[0].name,nodeType,node.lineNum);

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
                                    putMessage('Error in SA, intExpr expected int got boolean');
                                    errorCount = errorCount + 1;
                                }
                                else if(Number.isInteger(parseInt(currNode.children[1].name.valueOf())) == true)
                                {
                                    putMessage('Succesfully matched with int');
                                }
                                else if(currNode.children[1].name.charAt(0) == '"')
                                {
                                    putMessage('Error in SA, intExpr expected int got string');
                                    errorCount = errorCount + 1;
                                }
                                else if(currNode.children[1].name == "!=" || currNode.children[1].name == "==")
                                {
                                    
                                }
                                else
                                {
                                    var nodeType = symTable.cur.hashTable.findIdType(symTable.cur,currNode.children[1].name,node.lineNum);
                                    if (nodeType != "Int" && nodeType != false)
                                    {
                                        putMessage("Error, expecting a int, got a " + nodeType);
                                    }
                                }
                            }
                        }  

                        checkIntExpr(node);
        			}
        			else if(node.children[1].name == "!=" || node.children[1].name == "==")
        			{
        				console.log("not looking into boolop yet");
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