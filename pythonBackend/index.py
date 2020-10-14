from functools import wraps
from flask import Flask, jsonify, request, make_response
import psycopg2
from flask_bcrypt import Bcrypt
import redis
import jwt
import datetime
from flask_cors import CORS
import sys
import os

redisdb = redis.Redis(host="127.0.0.1", port=6379)
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'thisisthesecretkey'
bcrypt = Bcrypt(app)
con = psycopg2.connect(
    host="127.0.0.1",
    database="ex3",
    user="postgres",
    password="qwerasdf")
cursor = con.cursor()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers['Authorization']
        IDP = request.get_json().get('id')
        ID = redisdb.get(token).decode('utf-8')
        if not token or IDP != ID:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            token = jwt.decode(token, app.config['SECRET_KEY'])

        except:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(*args, **kwargs)

    return decorated


@app.route("/register", methods=['GET', 'POST'])
def hello():
    try:
        name = request.get_json().get('name')
        password = request.get_json().get('password')
        email = request.get_json().get('email')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        postgres_insert_query2 = """ INSERT INTO users (name, email) VALUES (%s,%s)"""
        postgres_insert_query = """ INSERT INTO login (hash, email) VALUES (%s,%s)"""
        record_to_insert = (hashed_password, email)
        record_to_insert2 = (name, email)
        cursor.execute(postgres_insert_query, record_to_insert)
        cursor.execute(postgres_insert_query2, record_to_insert2)
        postgreSQL_select_Query = "select * from users where email = %s"
        cursor.execute(postgreSQL_select_Query, (email,))
        row = cursor.fetchall()[0]
        user = {"id": f"{row[0]}", "name": f"{row[1]}", "email": f"{row[2]}", "basketball": f"{row[3]}",
                "futsal": f"{row[4]}", "footy": f"{row[5]}", "soccer": f"{row[6]}", "volleyball": f"{row[7]}"}
        con.commit()
        resp = jsonify(user)
        resp.status_code = 200
        return resp
    except (Exception, psycopg2.Error) as error:
        print("Error fetching data from PostgreSQL table", error)
        con.rollback()
        return jsonify({'msg': "Error fetching data from PostgreSQL table"})


@app.route("/signin", methods=['PUT'])
def signin2():
    try:
        id = request.get_json().get('id')
        print(id, "shmulik")
        postgreSQL_update_Query = "update users set isloggedin=%s where id=%s"
        cursor.execute(postgreSQL_update_Query, (True, id))
        con.commit()
        return jsonify("success")


    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(sys.exc_info(), fname, exc_tb.tb_lineno)
        return jsonify("error")


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    try:
        token = request.headers['Authorization']
        print(token)
        if token is not None:
            id = redisdb.get(token).decode('utf-8')
            postgreSQL_select_Query = "select * from login where id = %s"
            cursor.execute(postgreSQL_select_Query, [id])
            row = cursor.fetchall()[0]
        else:
            password = request.get_json().get('password')
            email = request.get_json().get('email')
            postgreSQL_select_Query = "select * from login where email = %s"
            cursor.execute(postgreSQL_select_Query, [email])
            row = cursor.fetchall()[0]
            if row[2] != email or not bcrypt.check_password_hash(row[1], password):
                return jsonify("incorrect form submission")
            payload = {'email': f'{email}', 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3600)}
            token = jwt.encode(payload, app.config['SECRET_KEY'])
            redisdb.set(token.decode('UTF-8'), row[0])
        postgreSQL_select_Query = "select * from users where email = %s"
        cursor.execute(postgreSQL_select_Query, [email])
        row = cursor.fetchall()[0]
        user = {"id": f"{row[0]}", "name": f"{row[1]}", "email": f"{row[2]}", "basketball": f"{row[3]}",
                "futsal": f"{row[4]}", "footy": f"{row[5]}", "soccer": f"{row[6]}", "volleyball": f"{row[7]}",
                "isloggedin": f"{row[8]}"}
        total = {"success": "true", "token": token.decode('UTF-8'), "user": user, 'userId': f"{row[0]}"}
        resp = jsonify(total)
        resp.status_code = 200
        return resp
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(sys.exc_info(), fname, exc_tb.tb_lineno)
        return jsonify("error")


@app.route("/shoppingcart", methods=['GET', 'POST'])
@token_required
def shop2():
    try:
        id = request.get_json().get('id')
        postgreSQL_select_Query = "select * from users where id = %s"
        cursor.execute(postgreSQL_select_Query, f"{id}")
        row = cursor.fetchall()[0]
        user = {"basketball": f"{row[3]}", "futsal": f"{row[4]}", "footy": f"{row[5]}", "soccer": f"{row[6]}",
                "volleyball": f"{row[7]}"}
        resp = jsonify(user)
        resp.status_code = 200
        return resp
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@app.route("/signout", methods=['GET', 'POST', 'PUT'])
def signout():
    token = request.headers['Authorization']
    id = request.get_json().get('id')
    ID = redisdb.get(token).decode('utf-8')
    if not token or (id != ID):
        return jsonify({'message': 'Token is missing!'}), 403

    try:
        check = 1
        token2 = jwt.decode(token, app.config['SECRET_KEY'])
        check = 2
        redisdb.delete(token)
        postgreSQL_update_Query = "update users set isloggedin=%s where id=%s"
        cursor.execute(postgreSQL_update_Query, (False, id))
        con.commit()
        return jsonify("success")

    except:
        if (check == 1):
            return jsonify({'message': 'Token is invalid!'}), 403
        else:
            print("Error")
            return jsonify({'msg': "Error decode"})


@app.route("/shoppingcart1", methods=['GET', 'POST', 'PUT'])
@token_required
def shop():
    try:
        id = request.get_json().get('id')
        soccer = request.get_json().get('soccer')
        futsal = request.get_json().get('futsal')
        footy = request.get_json().get('footy')
        volleyball = request.get_json().get('volleyball')
        basketball = request.get_json().get('basketball')
        print(id, soccer, futsal)
        postgreSQL_update_Query = "update users set basketball=%s, volleyball=%s, futsal=%s, footy=%s, soccer=%s where id=%s"
        cursor.execute(postgreSQL_update_Query, (basketball, volleyball, futsal, footy, soccer, id))
        con.commit()
        message = "success"
        resp = jsonify(message)
        resp.status_code = 200
        return resp
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(sys.exc_info(), fname, exc_tb.tb_lineno)
        return jsonify("error")


@app.route("/profile/<id>", methods=['GET', 'POST'])
def oneuser(id):
    print(id)
    token = request.headers['Authorization']
    ID = redisdb.get(token).decode('utf-8')
    print(ID)
    if not token or (id != ID):
        return jsonify({'message': 'Token is missing!'}), 404

    try:
        check = 1
        token = jwt.decode(token, app.config['SECRET_KEY'])
        print(token)
        check = 2
        postgreSQL_select_Query = "select * from users where id = %s"
        cursor.execute(postgreSQL_select_Query, f"{id}")
        row = cursor.fetchall()[0]
        print(row)
        user = {"id": f"{row[0]}", "name": f"{row[1]}", "email": f"{row[2]}", "basketball": f"{row[3]}",
                "futsal": f"{row[4]}", "footy": f"{row[5]}", "soccer": f"{row[6]}", "volleyball": f"{row[7]}"}

        return jsonify(user)


    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(sys.exc_info(), fname, exc_tb.tb_lineno)
        if (check == 1):
            return jsonify({'message': 'Token is invalid!'}), 403
        else:
            print("Error fetching data from PostgreSQL table", error)
            return jsonify("error")


@app.route("/allprofile/<id>", methods=['GET', 'POST'])
def allusers(id):
    token = request.headers['Authorization']
    ID = redisdb.get(token).decode('utf-8')
    if not token or (id != ID and id != 3 and ID != 3):
        return jsonify({'message': 'Token is missing!'}), 403

    try:
        token = jwt.decode(token, app.config['SECRET_KEY'])
        postgreSQL_select_Query = "select * from users"
        cursor.execute(postgreSQL_select_Query)
        array = cursor.fetchall()
        resault = []
        for row in array:
            user = {"id": f"{row[0]}", "name": f"{row[1]}", "email": f"{row[2]}", "basketball": f"{row[3]}",
                    "volleyball": f"{row[4]}", "footy": f"{row[5]}", "soccer": f"{row[6]}", "futsal": f"{row[7]}", "isloggedin": f"{row[8]}"}
            resault.append(user)
        return jsonify(resault)

    except:
        return jsonify({'message': 'Token is invalid!'}), 403


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
