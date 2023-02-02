//
//  UserModel.swift
//  AllNote
//
//  Created by Bradlee King on 31/01/2023.
//

import Foundation


class UserModel: Identifiable {
    public var id: Int64 = 0
    public var Firstname: String = ""
    public var Surname: String = ""
    public var email: String = ""
    public var age: Int64 = 0
}
