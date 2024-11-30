#include <iostream>
using namespace std;

class Node {
public:
  int value;
  Node *next;

  Node(int val = -1) {
    this->value = val;
    this->next = nullptr;
  }
};

class LinkedList {
  Node *head;
  Node *tail;

public:
  LinkedList() {
    this->head = nullptr;
    this->tail = nullptr;
  }

  void insertElementAtHead(int element) {
    if (this->head == nullptr) {
      this->head = new Node(element);
      this->tail = this->head;
    } else {
      Node *newNode = new Node(element);
      newNode->next = this->head;
      this->head = newNode;
    }
  }

  void insertElementAtMiddle(int element) {}

  void insertAfterElement(int element) {}

  void insertElementAtTail(int element) {
    // If linked list is empty
    if (this->head == nullptr) {
      this->head = new Node(element);
      this->tail = this->head;
    } else {
      this->tail->next = new Node(element);
      this->tail = this->tail->next;
    }
  }

  void printElements() {
    if (this->head == nullptr) {
      cout << "The Linked List is empty";
    }
    Node *current = this->head;

    while (current != nullptr) {
      cout << current->value << " ";
      current = current->next;
    }
    cout << '\n';
  }

  void deleteElement(int element) {
    if (this->head == nullptr) {
      cout << "The linked list is empty";
      return;
    }
    if (this->head->value == element) {
      Node *temp = this->head->next;
      delete this->head;
      this->head = temp;
      return;
    }

    Node *temp = this->head;

    while (temp->next != nullptr) {
      if (temp->next->value == element) {
        Node *nodeToDelete = temp->next;
        temp->next = temp->next->next;
        if (nodeToDelete == this->tail) {
          this->tail = temp;
        }
        delete nodeToDelete;
        return;
      }
      temp = temp->next;
    }
  }
  ~LinkedList() {
    if (this->head->next != nullptr) {
      Node *current = this->head;
      while (current != nullptr) {
        Node *temp = current->next;
        delete temp;
        current = temp;
      }
    }
  }
};

int main() {
  LinkedList *list = new LinkedList();
  list->insertElementAtTail(10);
  list->insertElementAtTail(2);
  list->insertElementAtTail(4);
  list->insertElementAtHead(9);
  list->insertElementAtHead(19);
  list->insertElementAtTail(14);

  list->deleteElement(14);

  list->printElements();

  return 0;
}
