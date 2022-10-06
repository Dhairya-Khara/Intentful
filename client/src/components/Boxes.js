function Boxes() {
    const entities = [{ id: "A", content: "entity1"}, 
                      { id: "B", content: "entity2"},
                      { id: "D", content: "entity3"},
                      { id: "E", content: "entity4"},
                      { id: "C", content: "entity5"}]
    return (
      <main>
        <div className="App">
          <h1>Intentful</h1>
        </div>
        <div className="box-container">
              {entities.map(entity => (
              <div class = "arrow-entity">
                <div className = "entity" key = {entity.id}>
                  {entity.content}
                </div>
                <img src={arrow} alt="arrow" width="200px" class = "arrow" key = {entity.id} id = {entity.id}></img>
              </div>
            ))}
          </div>
      </main>
    );
  }

  export default Boxes