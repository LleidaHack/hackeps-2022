import json
from pathlib import Path

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def database_instance():
    """ Authenticate to firebase and get a firestore instance """
    cred = credentials.Certificate('credentials.json')
    firebase_admin.initialize_app(cred)
    return firestore.client()


def load_faqs(assets_path):
    """ Read faqs json file """
    with assets_path.joinpath('faqs.json').open() as f:
        return json.load(f)


def clear_collection(db, collection):
    """ Remove all items of a collection """
    documents = db.collection(collection).stream()
    for d in documents:
        d.reference.delete()


def create_items(db, collection, data):
    """ Add multiple items to a collectoin in a single shot """
    collection = db.collection(collection)
    for d in data:
        assert isinstance(d, dict), "Only dictionaries can be inserted to a firestore collection"
        collection.add(d)


def override_collection(db, collection, data):
    """ Overrides a firestore collection with new data """
    clear_collection(db, collection)
    create_items(db, collection, data)


# Authenticate using service account
# Get firestore instance
db = database_instance()

# Read the faqs file from assets folder
faqs = load_faqs(Path('assets'))

# Remove previous faqs and add the new ones
override_collection(db, 'faqs', faqs)
