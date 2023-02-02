//
//  NoteBookMainView.swift
//  AllNote
//
//  Created by Bradlee King on 31/01/2023.
//

import SwiftUI

struct NoteBookMainView: View {
    
    var notes: [Notes] = [
        .init(title: "Xbox", imageName: "xbox.logo", color: .green),
        .init(title: "PlayStation", imageName: "playstation.logo", color: .indigo),
        .init(title: "PC", imageName: "pc", color: .pink),
        .init(title: "Mobile", imageName: "iphone", color: .mint)
    
    ]
    
    
    var body: some View {
        NavigationStack {
            VStack {
                List() {
                    Section("Notes") {
                        ForEach(notes, id: \.title) { note in
                            NavigationLink(value: note) {
                                Label(note.title, systemImage: note.imageName)
                                    .foregroundColor(note.color)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Notes")
            .navigationDestination(for: Notes.self) { notes in
                ZStack {
                    notes.color.ignoresSafeArea()
                    
                    Label(notes.title, systemImage: notes.imageName)
                        .font(.largeTitle).bold()
                }
            }
        }
    }
}

struct NoteBookMainView_Previews: PreviewProvider {
    static var previews: some View {
        NoteBookMainView()
    }
}


struct Notes: Hashable {
    let title: String
    let imageName: String
    let color: Color
}
