# 02 - Setup and Prerequisites

Follow this exactly before Day 1.

## Required tools

1. Python 3.11+
2. PostgreSQL 14+
3. VS Code
4. Git
5. (Optional for later) Tesseract OCR

## Create backend_v2 folder

From project root (`AuthNexus-1`):

```powershell
mkdir backend_v2
cd backend_v2
```

## Create Python virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## Install base dependencies

```powershell
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary pydantic-settings python-dotenv passlib[bcrypt] python-jose[cryptography] python-multipart
```

## Freeze dependencies

```powershell
pip freeze > requirements.txt
```

## Create initial backend_v2 folder structure

```powershell
mkdir app
mkdir app\core
mkdir app\db
mkdir app\db\models
mkdir app\db\repositories
mkdir app\schemas
mkdir app\api
mkdir app\api\routes
mkdir app\services
mkdir app\utils
ni app\__init__.py -ItemType File
ni app\core\__init__.py -ItemType File
ni app\db\__init__.py -ItemType File
ni app\db\models\__init__.py -ItemType File
ni app\db\repositories\__init__.py -ItemType File
ni app\schemas\__init__.py -ItemType File
ni app\api\__init__.py -ItemType File
ni app\api\routes\__init__.py -ItemType File
ni app\services\__init__.py -ItemType File
ni app\utils\__init__.py -ItemType File
```

## Create environment file

Create `.env` in `backend_v2/`:

```env
APP_NAME=AuthNexus Backend V2
APP_ENV=development
APP_DEBUG=true
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/authnexus_v2
JWT_SECRET_KEY=change_this_to_long_random_value
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
UPLOAD_DIR=uploads
```

## PostgreSQL setup

1. Create database `authnexus_v2`.
2. Verify DB connection manually.
3. Keep credentials in `.env`, never hardcode.

## First run check (empty app later)

```powershell
python -m uvicorn app.main:app --reload
```

If this command fails, do not continue to Day 1 until fixed.

## Common beginner mistakes

1. Using global DB sessions instead of per-request session.
2. Hardcoding credentials in code.
3. Mixing sync and async without understanding blocking operations.
4. Writing route logic before defining schemas and services.
