## 🚀 Instructions

1. **Clone the project**  
   ```bash
   git clone https://github.com/eimanncalderon0711/assessment_crud.git
   cd assessment_crud
   dad
   
2. **Start the project**
   ```bash
   ./start.sh
  - Run using docker
    ```bash
    docker compose up
  - Import the sql
    ```bash
    docker exec -i postgres_db psql -U ejuser -d nestdb < backup.sql

3. **Stop the project**
    ```bash
    ./stop.sh
  - Stop using docker
   ```bash
      docker compose down
