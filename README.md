AGE Prdediction APP

### Try out the APP here
https://melodious-mochi-db7070.netlify.app/


### Steps for Local setup
1. In main.py for load_model() use "../model/age_model.keras"
2. In script.js use for fetch: "http://127.0.0.1:8000/predict"
3. Run backend. Type cmd in terminal: cd backend
4. type: uvicorn main:app --reload
5. In browser open: http://127.0.0.1:8000/docs
6. Backend is up
7. Frontend:
8. cd frontend
9. python -m http.server 5500
10. Open http://localhost:5500 in browser. Allow camera permissions.
11. Service is UP !!

### Model Training
Model Training is done in colab notebook. After that .kernal file is added to this repository.
Colab notebook: https://colab.research.google.com/drive/1P0d6VfDdi1dfeet1DfyMNZ6feOvNreEu?usp=sharing

