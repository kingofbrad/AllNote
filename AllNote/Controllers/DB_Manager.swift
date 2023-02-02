//
//  DB_Manager.swift
//  AllNote
//
//  Created by Bradlee King on 31/01/2023.
//

import Foundation
import SQLite


class DB_Manager {
    private var db: Connection!
    private var users: Table!
    private var id: Expression<Int64>!
    private var Firstname: Expression<String>!
    private var Surname: Expression<String>!
    private var email: Expression<String>!
    private var age: Expression<Int64>!
    
    init() {
        do{
            let path: String = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first ?? ""
            
            let mainPath: String = "http://bradleeking.winchesterdigital.co.uk/AllNote/phpliteadmin.php?"
            
            db = try Connection("\(path)/AllNote")
            
            users = Table("users")
            id = Expression<Int64>("id")
            Firstname = Expression<String>("Firstname")
            Surname = Expression<String>("Surname")
            email = Expression<String>("email")
            age = Expression<Int64>("age")
            
            if(!UserDefaults.standard.bool(forKey: "is_db_created")) {
                try db.run(users.create { (t) in
                    t.column(id, primaryKey: true)
                    t.column(Firstname)
                    t.column(Surname)
                    t.column(email, unique: true)
                    t.column(age)
                })
                
                UserDefaults.standard.set(true, forKey: "is_db_created")
            }
        } catch {
            print(error.localizedDescription)
        }
    }
    
    public func addUser(FirstnameValue: String, SurnameValue: String ,emailValue: String, ageValue: Int64) {
        do {
            try db.run(users.insert(Firstname <- FirstnameValue, Surname <- SurnameValue, email <- emailValue, age <- ageValue))
            
        } catch {
            print(error.localizedDescription)
        }
    }
    
    public func getUsers() -> [UserModel] {
        var userModels: [UserModel] = []
        
        users = users.order(id.desc)
        
        do {
            for user in try db.prepare(users) {
                let userModel: UserModel = UserModel()
                
                userModel.id = user[id]
                userModel.Firstname = user[Firstname]
                userModel.Surname = user[Surname]
                userModel.email = user[email]
                userModel.age = user[age]
                
                userModels.append(userModel)
            }
        } catch {
            print(error.localizedDescription)
        }
        
        return userModels
    }
    
    
    public func getUser(idValue: Int64) -> UserModel {
        let userModel: UserModel = UserModel()
        
        do {
            let user: AnySequence<Row> = try db.prepare(users.filter(id == idValue))
            
            try user.forEach({ (rowValue) in
                userModel.id = try rowValue.get(id)
                userModel.Firstname = try rowValue.get(Firstname)
                userModel.Surname = try rowValue.get(Surname)
                userModel.email = try rowValue.get(email)
                userModel.age = try rowValue.get(age)
            })
        } catch {
            print(error.localizedDescription)
        }
        
        return userModel
    }
    
    public func updateUser(idValue: Int64, FirstnameValue: String, SurnameValue: String, emailValue: String, ageValue: Int64) {
        do {
            let user: Table = users.filter(id == idValue)
            
            try db.run(user.update(Firstname <- FirstnameValue, Surname <- SurnameValue, email <- emailValue, age <- ageValue))
        } catch {
            print(error.localizedDescription)
        }
    }
    
    public func deleteUser(idValue: Int64) {
        do {
            let user: Table = users.filter(id == idValue)
            
            try db.run(user.delete())
        } catch {
            print(error.localizedDescription)
        }
    }
}
