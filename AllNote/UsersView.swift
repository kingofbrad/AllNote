//
//  UsersView.swift
//  AllNote
//
//  Created by Bradlee King on 02/02/2023.
//

import SwiftUI

struct UsersView: View {
    
    
    var users = [User]()
    
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
    }
}

struct UsersView_Previews: PreviewProvider {
    static var previews: some View {
        UsersView()
    }
}


struct User: Codable {
    var firstName: String
    var surName: String
    var email: String
    var age: Int
}

struct Users: Codable {
    var result: [User]
}

