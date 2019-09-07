function bfs(rootNode, vertices, edges){
    let queue = [];
    let visited = [];
    let explored = [];

    let rootIndex = vertices.indexOf(rootNode);

    vertices.splice(rootIndex, 1)

    queue.push(rootNode);
    visited.push(rootNode);

    while (queue.length != 0) {
        let currentNode = queue.shift();

        let adjacentNodesArray = findAdjacent(currentNode.name, vertices, edges);

        adjacentNodesArray.forEach(function(node) {
            queue.push(node);
            visited.push(node);
        })
        markDistanceAndPredecessor(currentNode, adjacentNodesArray);
        
        explored.push(currentNode);
    }
    

    return visited;
}

// returns adjacent nodes
function findAdjacent(nodeName, vertices, edges) {
    let adjacentNodes = [];

    edges.forEach(function(edge) {
        if (edge[0] === nodeName) {
            let node = vertices.find(function(vertex) {
              return vertex.name === edge[1]
            });
            
            if (node) {
                let adjacentIndex = vertices.indexOf(node);
                let adjacent = vertices.splice(adjacentIndex, 1);
    
                if (adjacent[0].distance === null) {
                    adjacentNodes.push(adjacent[0]);
                }
            }
        } else if (edge[1] === nodeName) {
            let node = vertices.find(function(vertex) {
              return vertex.name === edge[0]
            })

            if (node) {
                let adjacentIndex = vertices.indexOf(node);
                let adjacent = vertices.splice(adjacentIndex, 1);
    
                if (adjacent[0].distance === null) {
                    adjacentNodes.push(adjacent[0])
                };
            }
        }
    })

    return adjacentNodes;
}

function markDistanceAndPredecessor(rootNode, adjacentNodes) {
    if (rootNode.predeccessor === null) {
        adjacentNodes.forEach(function(node) {
            node.predecessor = rootNode;
            node.distance = 1;
        });
    } else {
        adjacentNodes.forEach(function(node) {
            node.predecessor = rootNode;
            node.distance = (rootNode.distance + 1);
        });
    }

    return adjacentNodes;
}


//      1. Add root node to queue
//      2. Mark root node as visited 
//      3. Find adjacent nodes and add to queue
// 4. Mark adjacent nodes as visited
// 5. Mark root node as explored, remove from queue 

// 6. Choose next first node in queue
// 7. Find adjavent nodes and add to queue
// 8. Mark adjacent nodes as visited
// 9. Mark node as explored, remove from queue