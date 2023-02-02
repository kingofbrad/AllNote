//
//  ContentView.swift
//  AllNote
//
//  Created by Bradlee King on 31/01/2023.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            VStack {
                TabView {
                    NoteBookMainView()
                        .tabItem {
                            Label("NoteBook", systemImage: "book")
                        }
                    UsersView()
                        .tabItem {
                            Label("Users", systemImage: "person.fill")
                        }
                }
                
            }
            .padding()
        }
    }
}



struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
