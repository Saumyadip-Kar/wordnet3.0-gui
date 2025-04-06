import nltk
from nltk.corpus import wordnet as wn

# nltk.download("wordnet")
# nltk.download("omw-1.4")
# nltk.download("averaged_perceptron_tagger")
# nltk.download("punkt")

def get_word_info(word):
    """
    Extracts all possible details about a word using WordNet and returns it as structured data.
    """
    synsets = wn.synsets(word)

    if not synsets:
        return {"word": word, "error": f"No WordNet data found for '{word}'"}

    word_info = {"word": word, "synsets": []}

    for syn in synsets:
        syn_info = {
            "synset": syn.name(),
            "definition": syn.definition(),
            "examples": syn.examples() if syn.examples() else None,
            "part_of_speech": syn.pos(),
            "lemmas": [lemma.name() for lemma in syn.lemmas()],
            "antonyms": list({ant.name() for lemma in syn.lemmas() for ant in lemma.antonyms()}),
            "hypernyms": [h.name().split('.')[0] for h in syn.hypernyms()],
            "hyponyms": [h.name().split('.')[0] for h in syn.hyponyms()],
            "meronyms": [m.name().split('.')[0] for m in syn.part_meronyms()],
            "holonyms": [h.name().split('.')[0] for h in syn.part_holonyms()],
            "entailments": [e.name().split('.')[0] for e in syn.entailments()],
            "similar_words": [s.name().split('.')[0] for s in syn.similar_tos()],
            "derivational_forms": list({d.name() for lemma in syn.lemmas() for d in lemma.derivationally_related_forms()})
        }

        word_info["synsets"].append(syn_info)
        print(word_info)

    return word_info["synsets"]

from nltk.corpus import wordnet as wn

def generate_knowledge_graph(word, max_depth=2):
    """
    Generates a knowledge graph as a semi-structured object for a given word.
    Only considers hypernyms and hyponyms.
    """
    elements = []
    edges = []
    visited = set()
    edge_set = set()  # Set to track added edges
    node_set = set()  # Add this at the top, like edge_set


    def traverse(synset, level=0):
        if level > max_depth or synset in visited:
            return
        visited.add(synset)

        node_id = synset.name()#.split(".")[0] 
        if node_id not in node_set:
            elements.append({"data": {"id": node_id, "label": node_id}})
            node_set.add(node_id)


        # Hypernyms (Generalization)
        for hyper in synset.hypernyms():
            hyper_id = hyper.name()#.split(".")[0]
            if hyper_id not in node_set:
                elements.append({"data": {"id": hyper_id, "label": hyper_id}})
                node_set.add(hyper_id)    
            edge_tuple = (hyper_id, node_id, "is-a")

            if edge_tuple not in edge_set:  # Prevent duplicate edges
                edges.append({"data": {"source": hyper_id, "target": node_id, "label": "is-a"}})
                edge_set.add(edge_tuple)

            traverse(hyper, level + 1)

        # Hyponyms (Specialization)
        for hypo in synset.hyponyms():
            hypo_id = hypo.name()#.split(".")[0]
            if hypo_id not in node_set:
                elements.append({"data": {"id": hypo_id, "label": hypo_id}})
                node_set.add(hypo_id)    
                
            edge_tuple = (node_id, hypo_id, "is-a")

            if edge_tuple not in edge_set:  # Prevent duplicate edges
                edges.append({"data": {"source": node_id, "target": hypo_id, "label": "is-a"}})
                edge_set.add(edge_tuple)

            traverse(hypo, level + 1)

    synsets = wn.synsets(word)
    if not synsets:
        print(f"No WordNet data found for '{word}'")
        return []

    for synset in synsets:
        traverse(synset)
    all = elements + edges
    for i in all:
        print(i)
    return all  # Combine nodes and edges

# Iterating trhough all hypernyms instead of the most similar hypernym 
# which may cause it to be a DAG but not a tree and may not be handled by breadthfirst layout of cytoscape, 
# so use random layout instead of breathfirst for this part
def get_hypernym_tree_data(synset_id, nodes=None, edges=None, visited=None, depth=0):
    """
    Recursively builds a hypernym tree from the given synset.
    Each node includes id, label, definition, and depth.
    Each edge denotes an 'is-a' (hypernym) relationship.
    """
    if nodes is None:
        nodes = []
    if edges is None:
        edges = []
    if visited is None:
        visited = set()

    
    synset = wn.synset(synset_id)
    # Skip if already visited to prevent cycles
    if synset_id in visited:
        return nodes, edges

    visited.add(synset_id)

    # Add the node with depth and definition
    nodes.append({
        'data': {
            'id': synset_id,
            'label': synset_id,
            'definition': synset.definition(),
            'depth': depth
        }
    })

    # Recurse into hypernyms
    for hypernym in synset.hypernyms():
        hypernym_id = hypernym.name()

        # Add the hypernym relationship (edge)
        edges.append({
            'data': {
                'source': hypernym_id,
                'target': synset_id,
                'label': 'is-a'
            }
        })

        # Recurse, increasing depth
        get_hypernym_tree_data(hypernym.name(), nodes, edges, visited, depth + 1)

    return nodes + edges

#Have to fix it as the tree is being printed in the reverse order
def get_hypernym_tree_data_text(synset_name):
    tree_text = ""

    def hypernym_tree(synset_name, depth=0):
        nonlocal tree_text
        synset = wn.synset(synset_name)
        tree_text += "  " * depth + f"↳ {synset.name()} ({synset.definition()})\n"

        for hypernym in synset.hypernyms():
            hypernym_tree(hypernym.name(), depth + 1)

    hypernym_tree(synset_name)
    return tree_text




def get_hyponym_tree_data(synset_id, nodes=None, edges=None, visited=None, depth=0):
    """
    Recursively builds a hyponym tree from the given synset.
    Each node includes id, label, definition, and depth.
    Each edge denotes an 'is-a' (hyponym) relationship.
    """
    if nodes is None:
        nodes = []
    if edges is None:
        edges = []
    if visited is None:
        visited = set()

    # Avoid cycles
    if synset_id in visited:
        return nodes, edges

    visited.add(synset_id)
    synset = wn.synset(synset_id)

    # Add the current synset as a node
    nodes.append({
        'data': {
            'id': synset_id,
            'label': synset_id,
            'definition': synset.definition(),
            'depth': depth
        }
    })

    # Recurse through hyponyms (children)
    for hyponym in synset.hyponyms():
        hyponym_id = hyponym.name()

        # Add the edge: current → hyponym
        edges.append({
            'data': {
                'source': synset_id,
                'target': hyponym_id,
                'label': 'is-a'
            }
        })

        # Recurse into children
        get_hyponym_tree_data(hyponym_id, nodes, edges, visited, depth + 1)

    return nodes + edges

def get_hyponym_tree_data_text(synset_name):
    """
    Recursively builds a hyponym tree as text, formatted like a nested bullet list.
    """
    tree_text = ""

    def hyponym_tree(synset_name, depth=0):
        nonlocal tree_text
        synset = wn.synset(synset_name)
        tree_text += "  " * depth + f"↳ {synset.name()} ({synset.definition()})\n"

        for hyponym in synset.hyponyms():
            hyponym_tree(hyponym.name(), depth + 1)

    hyponym_tree(synset_name)
    return tree_text
