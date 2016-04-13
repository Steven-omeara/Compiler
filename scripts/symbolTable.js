function SymbolTable() {
    // ----------
    // Attributes
    // ----------
    
    this.root = null;  // Note the NULL root node of this tree.
    this.cur = {};     // Note the EMPTY current node of the tree we're building.
    
    //function to make new HashTable Object
    /*var HashTable()
    {
        this.variables = {};//used to hold variables

        this.addKeyValPair = function(currKey,currValue)
        {
            var pair = 
            {
                key: currKey,
                value: currValue
            }

            for (i = 0; i < variables.length; i++)
            {
                if (variables[i].key == key)
                {
                    variables[i].value = currValue;
                }
                if (i == (variables.length - 1) && variables[i].key != key)
                {
                    vraibles.push(pair);
                }
            }
        }
    }*/


    // -- ------- --
    // -- Methods --
    // -- ------- --

    // Add a node: kind in {branch, leaf}.
    this.addNode = function(name, kind) {
        
        //Construct the HashTable object to be used in node
        var HashTable =
        {
            variables: [],//used to hold variables

            //adding new Key/Val pairs to the table
            addKeyValPair : function(currKey,currType,currScope)
            {
                //create the value object, ADD LINE NUM
                var currValues = 
                {
                    type: currType,
                    scope: currScope
                }
                //create the pair object
                var pair = 
                {
                    key: currKey,
                    value: currValues
                }

                if (this.variables.length == 0)
                {
                    this.variables.push(pair);
                    //console.log(pair.key);
                }
                else
                {
                    for (i = 0; i < this.variables.length; i++)
                    {
                        if (this.variables[i].key == pair.key)
                        {
                            this.variables[i].value = pair.value;
                        }
                        else if (i == (this.variables.length - 1) && this.variables[i].key != pair.key)
                        {
                            this.variables.push(pair);
                        }
                    }
                }
            },

            printTable : function()
            {
                var currSymTable = "";
                for (i = 0; i < this.variables.length; i++)
                {
                    currSymTable += "Name: " + this.variables[i].key + "  Type: " + this.variables[i].value.type + "  Scope: " + this.variables[i].value.scope + "\n";
                }
                //console.log(this.variables[1].key);
                return currSymTable;
            },
        }

        // Construct the node object.
        var node = {
                     name: name,
                     children: [],
                     parent: {},
                     hashTable: HashTable
                   };

        // Check to see if it needs to be the root node.
        if ( (this.root == null) || (!this.root) )
        {
            // We are the root node.
            this.root = node;
        }
        else
        {
            // We are the children.
            // Make our parent the CURrent node...
            node.parent = this.cur;
            // ... and add ourselves (via the unfrotunately-named
            // "push" function) to the children array of the current node.
            this.cur.children.push(node);
        }
        // If we are an interior/branch node, then...
        if (kind == "branch")
        {
            // ... update the CURrent node pointer to ourselves.
            this.cur = node;
        }
    };

    // Note that we're done with this branch of the tree...
    this.endChildren = function() {
        // ... by moving "up" to our parent node (if possible).
        if ((this.cur.parent !== null) && (this.cur.parent.name !== undefined))
        {
            this.cur = this.cur.parent;
        }
        else
        {
            // TODO: Some sort of error logging.
            // This really should not happen, but it will, of course.
        }
    };

    // Return a string representation of the tree.
    this.toString = function() {
        // Initialize the result string.
        var traversalResult = "";

        // Recursive function to handle the expansion of the nodes.
        function expand(node)
        {
            // If there are no children (i.e., leaf nodes)...
            if (!node.children || node.children.length === 0)
            {
                // ... note the leaf node.
                //traversalResult += node.name;
                //traversalResult += "\n";
                //console.log(node.hashTable.printTable());
                //console.log(node.hashTable.test());
                traversalResult += node.hashTable.printTable();
            }
            else
            {
                // There are children, so note these interior/branch nodes and ...
                //traversalResult += node.name;
                traversalResult += node.hashTable.printTable();
                // .. recursively expand them.
                for (var i = 0; i < node.children.length; i++)
                {
                    expand(node.children[i]);
                }
            }
        }
        // Make the initial call to expand from the root.
        expand(this.root);
        // Return the result.
        return traversalResult;
    };
}