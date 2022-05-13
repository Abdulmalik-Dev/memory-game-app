import React, { Component } from "react";
import styled from "styled-components";

const MemoryBlocksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;

  .memory-block {
    padding: 0.1rem;
    margin-top: 1rem;

    // The Block For The Memory
    .block {
      width: 200px;
      height: 200px;
      transition: transform 3s;
      transform-style: preserve-3d;
      cursor: pointer;
      position: relative;
      flex: 1 0 200px;

      .face {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        backface-visibility: hidden;
      }

      .front {
        background-color: var(--mainColor);
        line-height: 200px;

        &::before {
          content: "!";
          font-size: 6rem;
          color: white;
        }
      }

      .back {
        background-color: blue;
        transform: rotateY(180deg);

        img {
          width: 140px;
          height: 140px;
          margin-top: 30px;
        }
      }
      /* On Select The Memory  */
      &.selected {
        transform: rotateY(180deg);
      }
    }
  }
`;

class MemoryBlocks extends Component {
  constructor() {
    super();
    this.selectMemory = this.selectMemory.bind(this);
    this.randomMemories();

    this.state = {
      // To Save The First Selected Memory Type Here
      firsrtMemory: 0,
      // To Save The Second Selected Memory Type Here
      secondMemory: 0,

      memoriesInfo: [
        {
          id: 1,
          imgSrc:
            "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
        },
        {
          id: 2,
          imgSrc:
            "https://infotrackgo.com.au/wp-content/uploads/2021/09/Person-Search-Header.jpg",
        },
        {
          id: 3,
          imgSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLT4Jolj7reQVX01YusyQV_dKXWvcEskBdBckxWypKmbTjqbXQP6v59xd7NjFM5HxdpAI&usqp=CAU",
        },
        {
          id: 4,
          imgSrc:
            "https://ultragreencorporation.com/wp-content/uploads/2019/02/person1.jpg",
        },
        {
          id: 5,
          imgSrc:
            "https://static01.nyt.com/images/2021/10/13/science/13shatner-launch-oldest-person-sub/13shatner-launch-oldest-person-sub-superJumbo.jpg",
        },
        {
          id: 6,
          imgSrc:
            "https://marvel-b1-cdn.bc0a.com/f00000000212114/www.lmc.edu/_images/enews-article/brian-sims.jpg",
        },
      ],
      // To Save All Memories After Make Random Of Memories Info Array
      blocks: [],
    };
  }
  // Make Random Of Memories Array
  randomMemories() {
    setTimeout(() => {
      // Save Clone Of Memories Array To Be There Are Tow Blocks Same
      this.setState({
        ...this.state,
        memoriesClone: [...this.state.memoriesInfo],
      });

      // Save First Clone To The Blocks Array
      for (let i = 0; i < this.state.memoriesClone.length; i++) {
        // Random Number
        let random = Math.floor(Math.random() * this.state.memoriesInfo.length);
        // Add The Memory To Blocks Array
        this.state.blocks.push(this.state.memoriesInfo[random]);
        // Remove The Block Added From Memories Info Array
        this.state.memoriesInfo.splice(random, 1);
      }

      // MemoriesClone Length
      let memoriesCount = this.state.memoriesClone.length;

      // Save Second Clone To The Blocks Array
      for (let i = 0; i < memoriesCount; i++) {
        // Random Number
        let random = Math.floor(
          Math.random() * this.state.memoriesClone.length
        );
        // Add The Memory To Blocks Array
        this.state.blocks.push(this.state.memoriesClone[random]);
        // Remove The Block Added From Memories Info Array
        this.state.memoriesClone.splice(random, 1);
      }

      this.createMemories();
    }, 1);
  }

  createMemories() {
    console.log(this.state.blocks);
    let memoriesCenter = document.querySelector("#allBlocks");

    for (let i = 0; i < this.state.blocks.length; i++) {
      // Create Elements
      let blockContainerElement = document.createElement("div"),
        blockElement = document.createElement("div"),
        frontElement = document.createElement("div"),
        backElement = document.createElement("div"),
        imgElement = document.createElement("img");

      // Add Elements Properties
      blockContainerElement.dataset.type = this.state.blocks[i].id;
      blockContainerElement.className = "memory-block";
      blockElement.className = "block";
      blockElement.onclick = this.selectMemory;
      frontElement.className = "front face";
      backElement.className = "back face";
      imgElement.src = this.state.blocks[i].imgSrc;

      // Append Elements To Them Parent
      backElement.appendChild(imgElement);
      blockElement.appendChild(frontElement);
      blockElement.appendChild(backElement);
      blockContainerElement.appendChild(blockElement);

      // Set The Memory To The Page
      memoriesCenter.appendChild(blockContainerElement);
    }
  }

  // On Click On Any Block
  selectMemory(e) {
    e.target.parentElement.classList.add("selected");

    setTimeout(() => {
      // If The User Selected First Memory
      if (this.state.firsrtMemory == 0) {
        // Set The First Memory Value
        this.setState({
          firsrtMemory: e.target.parentElement.parentElement.dataset.type,
        });
      } else if (this.state.secondMemory == 0) {
        // Set The First Memory Value
        this.setState({
          secondMemory: e.target.parentElement.parentElement.dataset.type,
        });
      }

      this.checkForMemories();
    }, 1000);
  }

  checkForMemories() {
    /* Check If The Selected Tow MEmories 
        Check If The First Select Not Equal To The Second Select
          Make Select On The Selected Memories
          Remove Class Selected On The Memories
    */

    if (this.state.firsrtMemory != 0 && this.state.secondMemory != 0) {
      if (this.state.firsrtMemory !== this.state.secondMemory) {
        let firstSeclectedMemory = document.querySelectorAll(
            `[data-type='${this.state.firsrtMemory}']`
          ),
          secondSeclectedMemory = document.querySelectorAll(
            `[data-type='${this.state.secondMemory}']`
          );

        this.hideTheMemory(firstSeclectedMemory);
        this.hideTheMemory(secondSeclectedMemory);

        // Increase The Wrong Tries
        document.getElementById("wrongCount").innerHTML++;
      } else this.isGameEnd();

      // Reset The Values To Make Check For Other Memories
      this.setState({
        firsrtMemory: 0,
        secondMemory: 0,
      });
    }
  }

  hideTheMemory(targetMemories) {
    setTimeout(() => {
      targetMemories.forEach((memory) => {
        memory.children[0].classList.remove("selected");
      });
    }, 1000);
  }

  isGameEnd() {
    // Check If All Memories Selected
    if (
      document.querySelectorAll(".selected").length === this.state.blocks.length
    ) {
      // Make Window Scroll Top = 0
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
      // Appear The Layout
      let layout = document.getElementById("layout");
      layout.style.display = "grid";

      document.body.style.overflow = "hidden";

      // Set The Result
      layout.innerHTML = `<p>The Wrong Tries ${
        document.getElementById("wrongCount").innerHTML
      }</p>
    <button onclick="window.location.reload()">Restart</button>`;
    }
  }

  render() {
    return <MemoryBlocksContainer id="allBlocks"></MemoryBlocksContainer>;
  }
}

export default MemoryBlocks;
